- Finetuned Language Models Are Zero-Shot Learners
- 今天分享一种简单的方法来提升语言模型的 Zero-Shot 能力——`指示（或指令）微调（instruction tuning）` ，在一组通过指示描述的数据集上对语言模型微调，**大大提高了在未见过任务上的 Zero-Shot 能力**。
- PLM 在 Few-Shot 上表现一般都很好，但是在 Zero-Shot 上就很一般了，一个潜在的原因是模型很难执行和预训练不一样格式的 prompt。FLAN（Fine-tuned Language Net）却通过「指示微调」实现了不错的效果，如下图所示：
-
- 本文探索了一个简单的方法来提升语言模型基于指示的 Zero-Shot 能力，FLAN 与 GPT3 相比具有优势，并表明大规模语言模型可以遵循指令的潜在能力。
-