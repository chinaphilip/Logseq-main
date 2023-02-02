- Overview
  heading:: true
- There are four key components used in BERTopic [2], those are:
	- A transformer embedding model
	- UMAP dimensionality reduction
	- HDBSCAN clustering
	- Cluster tagging using c-TF-IDF
-
  >Transformer Embedding
  BERTopic supports several libraries for encoding our text to dense vector embeddings. If we build poor quality embeddings, nothing we do in the other steps will be able to help us, so it is very important that we choose a suitable embedding model from one of the supported libraries, which include:
	- Sentence Transformers
	- Flair
	- SpaCy
	- Gensim
	- USE (from TF Hub)
	-