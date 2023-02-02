title:: Is Neural Topic Modelling Better than Clustering? An Empirical Study on Clustering with Contextual Embeddings for Topics

- 这篇文章是把几种类型的生成式主题模型和基于聚类的主题模型做了对比
- 用的数据集的文本都是比较短的，没有超过120个字的
- Contextual Embeddings（文档表示）+UMAP（表示向量降维，不降维的话，聚类速度会非常慢）+KM（kmeans聚类）
- 最后结论是只要embedding足够好，聚类的质量是能够和