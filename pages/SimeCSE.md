- 本文的正负例有两种构建方式，对于无监督来说，作者使用了Droupout来构建正例，将一个样本经过encoder两次，就得到了一个正例对，负例则是同一个batch里的其它句子。而对于有监督则采用了SNLI数据集天然的结构，对立类别的是负例，另外两个类别的就是正例。没错就是如此简单的方法催生了新的SOTA
-
- 对于无监督的部分，最核心的创新点就是使用droupout来对文本增加噪音，从而构造一个正样本对，而负样本对则是在batch中选取的其它句子。其实对于图像任务来说，做数据增强其实非常简单，有各种的手段。但是对于NLP任务来说，传统的方法有词替，裁剪以及回译，但是作者发现这些方法都没有简单的dropout效果好。
-