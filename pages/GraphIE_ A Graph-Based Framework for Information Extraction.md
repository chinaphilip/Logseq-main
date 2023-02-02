title:: GraphIE: A Graph-Based Framework for Information Extraction

- https://github.com/polynoman/The-Annotated-GraphIE
- https://github.com/thomas0809/GraphIE
- GCN
- ![image.png](../assets/image_1645625366889_0.png)
- We formalize information extraction as a sequence tagging problem. Rather than simply modeling inputs as sequences, we assume there exists a graph structure in the data that can be exploited to capture non-local and non-sequential dependencies between textual units, namely words or sentences.
-
  >We consider two different designs of the graph:
	- sentence-level graph
	- word-level graph
-
  >Our model has three components:
	- **an encoder**.which generates local context-aware hidden representations for the textual unit (i.e. word or sentence, depending on the task) with a recurrent neural network;
	- **a graph module**, graph module is a **GCN**; which takes as input the sentence representation and conducts graph convolution on every node, propagating information between its neighbors, and integrating such information into a new hidden representation.
	- **a decoder**, In our work, the decoder is instantiated as a BiLSTM+CRF tagger
-
- ![image.png](../assets/image_1645626398426_0.png)
- We use the BIO (Begin, Inside, Outside) tagging scheme in this paper.
-
-
-