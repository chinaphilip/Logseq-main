- We demonstrate that fine-tuning with annotated data and enabling the model to consult external knowledge sources can lead to significant improvements towards the two key challenges of safety and factual grounding.
- The first challenge, safety, involves ensuring that the model’s responses are consistent with a set of human values, such as preventing harmful suggestions and unfair bias
- The second challenge, factual grounding, involves enabling the model to consult external knowledge sources, such as an information retrieval system, a language translator, and a calculator. We quantify factuality using a groundedness metric, and we find that our approach enables the model to generate responses grounded in known sources, rather than responses that merely sound plausible
- We study the benefits of model scaling with LaMDA on our three key metrics: quality, safety, and groundedness.
-
- The third metric, groundedness, is introduced for the model to produce responses that are grounded in known sources wherever they contain verifiable external world information. Due to neural language models such as LaMDA’s capacity to generalize 3 than just memorize, **they tend to generate responses that may seem plausible**, but actually contradict factual statements made in established sources. We use this metric for the model to avoid this tendency. While grounding in known sources does not guarantee factual accuracy, it allows users or external systems to judge the validity of a response based on the reliability of its source and its faithful reproduction. We find that augmenting model outputs with the ability to use external tools, such as an information retrieval system, is a promising approach to achieve this goal. Therefore, we collect data from a setting where crowdworkers can use external tools to research factual claims, and train the model to mimic their behavior.
-
- >预训练设置
- LaMDA was pre-trained to predict the next token in a text corpus
- Unlike previous dialog models trained on dialog data alone [17, 18], we pre-trained LaMDA on a dataset created from public dialog data and other public web documents.
  Therefore, LaMDA can be used as a general language model prior to fine-tuning.
- 模型结构 decoder-only
- The Transformer has 64 layers, dmodel = 8192, df f = 65536, h = 128, dk = dv = 128, relative attention as described in T5 [11], and gated-GELU activation as described in Raffel et al. [93].、
- 参数
- The largest LaMDA model has 137B non-embedding parameters
- >LaMDA fine-tuning and evaluation data
- fine-tuning data collection process总的来说这个阶段的训练数据全是通过人工标注的
	- Quality (Sensibleness, Specificity, Interestingness):
	  background-color:: red
	- To improve quality (SSI), we collect 6400 dialogs with 121K turns by asking **crowdworkers** to interact with a LaMDA instance about any topic. These dialogs are required to last 14 to 30 turns. For each response, we ask other crowdworkers to rate whether the response given the context is sensible, specific, and/or interesting, and to and mark each with ‘yes’, ‘no’, or ‘maybe’ labels
	- Safety:
	  background-color:: red
	- Similar to SSI, we collect 8K dialogs with 48K turns by asking crowdworkers to interact with a LaMDA instance about any topic. These dialogs are required to last 5 to 10 turns.
	- Groundedness:
	  background-color:: red
	- Similar to SSI and safety, we collect 4K dialogs with 40K turns by asking crowdworkers to interact with the model. This time, we request that they try to steer the conversation towards information-seeking interactions.
	- We ask crowdworkers to rate each of the model’s dialog turns, evaluating whether the information in the turn makes any claims about the external world.
- fine tuning process
- ### Fine-tuning to Learn to Use External Information
- 模型有时会生成很多看起来合理，但不合逻辑的回复。一种方案是增加模型大小，从而让它很好地记忆训练数据中的外部知识。本文提出了一种新的利用外部知识的微调方案，挺有意思，也是我认为LaMDA在模型上最关键的创新点。
- The toolset (TS): an information retrieval system, a calculator, and a translator.
  每个tool的输入是个字符串，输出是字符串列表。比如：
	- Information retrieval： "How old is Rafael Nadal?" -> ["Rafael Nadal / Age / 35"]
	- Calculator: "135+7721" -> ["7856"]
	- Translator: "hello in French" -> ["Bonjour"]
- 对每个输入，将这三个tool输出的结果列表连接在一起，作为最终结果，如果某个tool无法解析输入，就输出空列表。
  回想一下真人的对话过程，给定一个Query，比如 `How old is Rafael Nadal?` ，如果人知道答案，那么直接回答35岁即可，如果不知道，则需要去 `Research` 一下，借助搜索引擎找到答案，然后再回答35岁。下面的两个微调任务就模拟了这个过程。
- Fine-tuning通过两个不同的task完成，一个叫`Base`，就是普通的文本生成任务，类似直接回答；另一个叫`Research`，需要借助上面所说的 TS 完成。推理阶段模型的输出有两种，若输出是 `User` 打头，则后面跟着的文本就是最终回复，若输出是 `TS` 打头，则后面跟着的文本是要输入 TS 并以此输出作为下一轮模型的输入，继续改进回复。这样的迭代过程最多经历4轮。下面的这个例子很好地解释了这个过程，Eiffel Tower是哪年建的，共经过四轮，才得到最终回复：
- ![](https://pic1.zhimg.com/80/v2-01b6702a774fdb8af291f1c22d0adf40_720w.webp)
-
- We collect a set of human-human dialogs between crowdworkers, focused on information-seeking interactions, and evaluate whether their statements can be supported by known authoritative sources. As seen in Figure 4, it is notable that they make well-supported claims at a higher rate if they have access to TS
-
- The first task takes the multiturn dialog context to date and the response generated by the base model. It then generates a special string (“TS” for toolset) indicating the following text is a query (e.g., “How old is Rafael Nadal?”) that should be sent to the toolset: context + base → “TS, Rafael Nadal’s age”.
  The second task takes the snippet returned by a tool, and a dialog statement (e.g., “He is 31 years old right now” + “Rafael Nadal / Age / 35”). It then predicts the grounded version: context + base + query + snippet → “User, He is 35 years old right now”. Alternatively, this task can also output an additional research query. For example, context + base + query + snippet → “TS, Rafael Nadal’s favorite song”. At inference time, the model’s output is directed to the information retrieval system or to the user, depending on whether the first generated string is ‘TS’ or ‘User’.
-
- 训练数据也需要依此过程人工标注获得，在与模型对话的过程中，crowdworker需要判断该回复是否需要额外知识，如果需要，则被要求 `research the claims using the toolset`，类似上面的 `Research` 过程；如不需要，则该回复可作为最终回复。
- 这个对回复不断研究和迭代的过程挺有趣，也是我个人觉得LaMDA的回复有信息量、有趣的主要原因之一，它很好地利用了标注数据，并用multi-task learning模拟了人类聊天回复的过程。
- ![](https://pic2.zhimg.com/80/v2-3b0b692a89afadd03c7413e16fe3a0d1_720w.webp)
- Domain grounding
- To adapt LaMDA and PT to each role, we precondition them on a few turns of role-specific dialogs, and we use the same pre-conditioning for LaMDA and PT. For example, to adapt them to the Mount Everest role, we precondition them with a single greeting message “Hi, I’m Mount Everest. What would you like to know about me?” at the very beginning of the dialog.
- ![](https://pic1.zhimg.com/80/v2-b20342bfe8d94576e023e9cf747f7830_720w.webp)
-
## 总结

文中Discussion指出：

> Perhaps the most noteworthy aspect of our study is that significant progress can be made towards better quality and safer dialog models with modest amounts of human-annotated fine-tuning data (less than 0.001% of pre-training data).

不过这里提到的 0.001% 的数据从绝对数量上来看并不小，比例看着不大是因为预训练的数据量太惊人了。

本文的主要贡献，提出了一系列精细化定义的对话质量评估指标，并通过标注和微调，让模型有了很好的对话体验。此外，提出了一种模拟人类先研究后回复的训练方案，从而让模型更好利用外部知识。

大模型的威力进一步得到了验证，与 [之前很多论文](https://zhuanlan.zhihu.com/nlmpowerlaw/) 的结论一致。主要的limitation是标注成本很高，和crowdworker不一定能反映真实用户的分布。
-