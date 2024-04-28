export function getTopKRecommendations(user_votes, band_feats, k, features) {
    return tf.tidy(() => {
      const user_votes_tensor = tf.tensor([user_votes]);
      const band_feats_tensor = tf.tensor(band_feats);
      const user_feats = tf.matMul(user_votes_tensor, band_feats_tensor);
      const { indices, values } = user_feats.topk(k);
      const arr = values.arraySync();
      return indices.arraySync().map((indices, userIndex) => {
        console.log("indices: ", indices);
        console.log("values: ", arr);
        return {
          user: "Yo",
          recommendations: indices.map((index, i) => {
            return {
              feature: features[index],
              value: arr[userIndex][i],
            };
          }),
        };
      });
    });
  }