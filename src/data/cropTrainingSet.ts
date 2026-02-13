export interface TrainingExample {
    N: number;
    P: number;
    K: number;
    temperature: number;
    humidity: number;
    ph: number;
    rainfall: number;
    label: string; // Crop Name
}

// Simulated "Real-World" Dataset based on Kaggle Crop Recommendation Data
// Each crop has multiple data points to allow the KNN algorithm to find the nearest neighbors.
export const cropTrainingSet: TrainingExample[] = [
    // Rice (Needs high rainfall, high humidity)
    { N: 90, P: 42, K: 43, temperature: 20, humidity: 82, ph: 6.5, rainfall: 202, label: 'Rice (அரிசி)' },
    { N: 85, P: 58, K: 41, temperature: 21, humidity: 80, ph: 7.0, rainfall: 220, label: 'Rice (அரிசி)' },
    { N: 60, P: 55, K: 44, temperature: 23, humidity: 83, ph: 6.4, rainfall: 250, label: 'Rice (அரிசி)' },
    { N: 75, P: 40, K: 40, temperature: 20, humidity: 81, ph: 6.0, rainfall: 210, label: 'Rice (அரிசி)' },

    // Maize (Needs moderate rainfall, balanced conditions)
    { N: 70, P: 45, K: 20, temperature: 24, humidity: 65, ph: 6.8, rainfall: 80, label: 'Maize (மக்காச்சோளம்)' },
    { N: 80, P: 50, K: 18, temperature: 26, humidity: 60, ph: 6.2, rainfall: 90, label: 'Maize (மக்காச்சோளம்)' },
    { N: 78, P: 48, K: 22, temperature: 22, humidity: 62, ph: 6.5, rainfall: 85, label: 'Maize (மக்காச்சோளம்)' },

    // Chickpea (Low rainfall, needs less nitrogen)
    { N: 40, P: 60, K: 80, temperature: 18, humidity: 18, ph: 7.2, rainfall: 80, label: 'Chickpea (சுண்டல்)' },
    { N: 35, P: 65, K: 75, temperature: 19, humidity: 20, ph: 7.4, rainfall: 85, label: 'Chickpea (சுண்டல்)' },

    // Kidney Beans (Needs simpler conditions)
    { N: 20, P: 60, K: 20, temperature: 20, humidity: 20, ph: 5.7, rainfall: 100, label: 'Kidneybeans (ராஜ்மா)' },
    { N: 25, P: 65, K: 25, temperature: 22, humidity: 22, ph: 5.8, rainfall: 110, label: 'Kidneybeans (ராஜ்மா)' },

    // Pigeonpeas (Needs hot climate)
    { N: 25, P: 65, K: 20, temperature: 28, humidity: 55, ph: 5.8, rainfall: 150, label: 'Pigeonpeas (துவரம் பருப்பு)' },
    { N: 30, P: 60, K: 25, temperature: 29, humidity: 50, ph: 6.0, rainfall: 140, label: 'Pigeonpeas (துவரம் பருப்பு)' },

    // Mothbeans (Very drought resistant)
    { N: 20, P: 50, K: 20, temperature: 28, humidity: 50, ph: 6.5, rainfall: 40, label: 'Mothbeans (நரி பயறு)' },
    { N: 10, P: 40, K: 15, temperature: 29, humidity: 45, ph: 7.0, rainfall: 35, label: 'Mothbeans (நரி பயறு)' },

    // Mungbean
    { N: 20, P: 50, K: 20, temperature: 28, humidity: 85, ph: 6.8, rainfall: 50, label: 'Mungbean (பச்சை பயறு)' },

    // Blackgram
    { N: 40, P: 60, K: 20, temperature: 26, humidity: 80, ph: 7.0, rainfall: 65, label: 'Blackgram (உளுந்து)' },

    // Lentil
    { N: 20, P: 70, K: 20, temperature: 22, humidity: 65, ph: 6.8, rainfall: 45, label: 'Lentil (மைசூர் பருப்பு)' },

    // Pomegranate (Fruit)
    { N: 30, P: 20, K: 40, temperature: 22, humidity: 90, ph: 6.5, rainfall: 105, label: 'Pomegranate (மாதுளை)' },

    // Banana (High K, high humidity)
    { N: 100, P: 75, K: 50, temperature: 27, humidity: 80, ph: 6.0, rainfall: 100, label: 'Banana (வாழை)' },
    { N: 110, P: 80, K: 55, temperature: 28, humidity: 82, ph: 6.2, rainfall: 110, label: 'Banana (வாழை)' },

    // Mango (Needs distinct conditions)
    { N: 20, P: 25, K: 30, temperature: 30, humidity: 50, ph: 5.5, rainfall: 90, label: 'Mango (மாம்பழம்)' },

    // Grapes
    { N: 25, P: 130, K: 200, temperature: 25, humidity: 80, ph: 6.0, rainfall: 66, label: 'Grapes (திராட்சை)' },

    // Watermelon
    { N: 100, P: 10, K: 50, temperature: 25, humidity: 85, ph: 6.5, rainfall: 50, label: 'Watermelon (தர்பூசணி)' },

    // Muskmelon
    { N: 100, P: 15, K: 50, temperature: 28, humidity: 90, ph: 6.7, rainfall: 50, label: 'Muskmelon (முலாம் பழம்)' },

    // Apple
    { N: 20, P: 130, K: 200, temperature: 22, humidity: 90, ph: 6.0, rainfall: 110, label: 'Apple (ஆப்பிள்)' },

    // Orange
    { N: 20, P: 10, K: 30, temperature: 25, humidity: 90, ph: 7.0, rainfall: 110, label: 'Orange (ஆரஞ்சு)' },

    // Papaya
    { N: 50, P: 55, K: 50, temperature: 33, humidity: 90, ph: 6.7, rainfall: 150, label: 'Papaya (பப்பாளி)' },

    // Coconut
    { N: 20, P: 20, K: 30, temperature: 27, humidity: 95, ph: 5.8, rainfall: 150, label: 'Coconut (தேங்காய்)' },

    // Cotton (High N, P, K)
    { N: 120, P: 55, K: 35, temperature: 25, humidity: 75, ph: 6.5, rainfall: 80, label: 'Cotton (பருத்தி)' },
    { N: 115, P: 50, K: 30, temperature: 26, humidity: 78, ph: 6.8, rainfall: 85, label: 'Cotton (பருத்தி)' },

    // Jute
    { N: 80, P: 45, K: 40, temperature: 25, humidity: 80, ph: 6.8, rainfall: 170, label: 'Jute (சணல்)' },

    // Coffee
    { N: 100, P: 20, K: 30, temperature: 24, humidity: 60, ph: 6.5, rainfall: 150, label: 'Coffee (காபி)' }
];
