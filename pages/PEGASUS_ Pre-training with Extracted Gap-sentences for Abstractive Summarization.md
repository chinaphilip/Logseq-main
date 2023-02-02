title:: PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization

- ##PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization
- https://github.com/google-research/pegasus
- https://arxiv.org/abs/1912.08777
- #文本摘要
- 这就是谷歌发布的“天马”（PEGASUS）模型，它专门为机器生成摘要而生，刷新了该领域的SOTA成绩，并被ICML 2020收录。
- “天马”模型仅使用1000个样本进行训练，就能接近人类摘要的水平，大大减少了对监督数据的需求，创造了低成本使用的可能性。
- PEGASUS的全称是：利用提取的间隙句进行摘要概括的预训练模型（Pre-training with Extracted Gap-sentences for Abstractive Summarization）。就是设计一种间隙句生成的自监督预训练目标，来改进生成摘要的微调性能。
- 在“天马”模型的预训练中，研究者从一段文档中删掉一些句子，让模型进行恢复任务。这些隔空删掉的句子即为间隙句。
- 尽管PEGASUS在大型数据集上表现出了卓越的性能，但令人惊讶的是，“天马”模型并不需要大量的样本来进行微调，就可以达到近乎SOTA的性能。
- 与基线相比，即使仅用1000个微调样本，“天马”在大多数任务中的性能还是要好一些。要考虑到，在某些实际情况下，样本数量还要多几个数量级。这种“样本效率”极大地提高了文本摘要模型的实用性，因为它大大降低了监督数据收集的规模和成本。
- [[science knowledge graph]]