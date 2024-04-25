// Este código se ejecutará una vez que la página HTML esté completamente cargada
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Script loaded!');
  
    // Ejemplo básico de TensorFlow.js
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
  
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
  
    // Entrenamiento del modelo
    await model.fit(xs, ys, {epochs: 500});
    console.log('Model trained!');
  
    // Predecir un nuevo valor
    const result = model.predict(tf.tensor2d([5], [1, 1]));
    result.print();
  });
  