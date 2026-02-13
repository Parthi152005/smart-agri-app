import { type TrainingExample, cropTrainingSet } from '../data/cropTrainingSet';

// Define the structure for a "Neighbor"
interface Neighbor {
    crop: string;
    distance: number;
}

export interface PredictionResult {
    crop: string;
    confidence: number;
    neighbors: string[]; // List of nearest neighbors for explainability
}

/**
 * Calculates Euclidean Distance between two data points.
 * Distance = Sqrt( (x2-x1)^2 + (y2-y1)^2 + ... )
 */
function calculateDistance(input: Omit<TrainingExample, 'label'>, dataPoint: TrainingExample): number {
    return Math.sqrt(
        Math.pow(input.N - dataPoint.N, 2) +
        Math.pow(input.P - dataPoint.P, 2) +
        Math.pow(input.K - dataPoint.K, 2) +
        Math.pow(input.temperature - dataPoint.temperature, 2) +
        Math.pow(input.humidity - dataPoint.humidity, 2) +
        Math.pow(input.ph - dataPoint.ph, 2) +
        Math.pow(input.rainfall - dataPoint.rainfall, 2)
    );
}

/**
 * K-Nearest Neighbors (KNN) Classifier
 * @param input - The user's soil and weather data
 * @param k - Number of neighbors to consider (default: 3)
 */
export function classifyCrop(input: Omit<TrainingExample, 'label'>, k: number = 3): PredictionResult[] {
    // 1. Calculate distances between input and all training examples
    const distances: Neighbor[] = cropTrainingSet.map(example => ({
        crop: example.label,
        distance: calculateDistance(input, example)
    }));

    // 2. Sort by distance (smallest first) to find nearest neighbors
    distances.sort((a, b) => a.distance - b.distance);

    // 3. Select top K neighbors
    const kNearest = distances.slice(0, k);
    const nearestCrops = kNearest.map(n => n.crop);

    // 4. Vote: Count occurrences of each crop
    const voteCounts: Record<string, number> = {};
    kNearest.forEach(neighbor => {
        voteCounts[neighbor.crop] = (voteCounts[neighbor.crop] || 0) + 1;
    });

    // 5. Convert votes to results with confidence scores
    const results: PredictionResult[] = Object.entries(voteCounts)
        .map(([crop, count]) => ({
            crop,
            confidence: Math.round((count / k) * 100),
            neighbors: nearestCrops
        }))
        .sort((a, b) => b.confidence - a.confidence); // Sort by confidence

    return results;
}
