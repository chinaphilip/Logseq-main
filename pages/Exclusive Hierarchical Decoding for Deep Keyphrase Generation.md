- ![image.png](../assets/image_1659607608982_0.png)
- We first encode each word of the document into a hidden state and then employ our exclusive hierarchical decoding
- Our hierarchical decoding process consists of phrase-level decoding (PD) and word-level decoding (WD)
- 这篇文章的exclusive的意思就是以前的key phrase generation容易生成重复的短语，他们在这里采用了一种机制来避免这种情况
- Then, the hidden representation of the captured aspect is employed to initialize the WD process to generate a new keyphrase word by word
-
  >Sequential Encoder
- To obtain the context-aware representation of each document word, we employ a two-layered bidirectional GRU (Cho et al., 2014) as the document encoder
-
  >Hierarchical Decoder
- Our hierarchical decoding process is controlled by the hierarchical decoder, which utilizes a phrase level decoder and a word-level decoder to handle the PD process and the WD process respectively
	- Phrase-level Decoder
		- We adopt a unidirectional GRU layer as our phraselevel decoder
	- Word-level Decoder
		- We choose another unidirectional GRU layer to conduct word-level decoding. Under the i-th PD step, the word-level decoder updates its hidden state first
-