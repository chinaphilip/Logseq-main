title:: SciKGraph: A knowledge graph approach to structure a scientific field

- 这篇文章有点类似于citespace的分析方式
- 就是先从文章集合中抽取关键词，他这个抽取关键词的方式很特别，用的是一个什么Babelfy api， （一个文本实体链接模型）然后基于关键词共现构建图谱
- 最后在上面做一个关键词的聚类算法，图聚类算法用的是OClustR, 就是说每个子类代表一个细分方向，
- 最后是在每个细分的子类中再次应用该聚类算法，聚出来的子类中所有关键词，就组成一个keyphrase，感觉非常扯
- 用的两个数据集
	- WOS-5736论文数据集，包含了好几个学科领域的，是包含全文的
	- 自己构建的AI领域论文数据集，获取的格式是pdf,然后转化为text格式
-