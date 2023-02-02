-
- the proposed KATA model aims to explicitly extract trigger and recognizes the value based on the predicted trigger
-
- Learning key-to-trigger mapping only relies on the semantic relationship between the key and trigger and irrespective of where the trigger locates on the page
- Learning trigger-to-value mapping depends on both the semantic relationship and the relative,yet not absolute, position relationship between trigger and value
-
  id:: 6219eced-42fa-4a33-a888-be0cb84a1ec0
  > trigger extraction stage
	- The trigger extraction stage receives a given key k and a document d, and then extracts the trigger t from the words in this document.
	- This process can be regarded as binary classification (“Trigger” or “None”) over the words in the document
	- we pack **the words in the key** and the words in the document together, then tokenize them into one token sequence. To make the model differentiate the key and document, we add a token “[SEP]” between them and assign a learned segment embedding to each token indicating whether it belongs to the key or document. To represent the spatial position of each token, we assign 2-D position embedding to each token following LayoutLM.
-
  >value extraction stage
	- The value extraction stage receives a key k, a document d, the predicted trigger t, and then recognizes the value v from the words in this document.
	- This process can also be regarded as binary classification (“Value” or “None”) over
	  the words in the document
	- Note that the key is added as auxiliary information to the value extraction stage once extracting incorrect triggers or no trigger exists in the previous stage
	- Since the trigger is predicted explicitly in the first stage, we allocate learned trigger embedding to each token indicating whether it belongs to a trigger or not
- The structure of the Transformer is the same but the parameters are different in two stages. Finally, we use SoftMax to classify each token and use cross-entropy loss as the objective function.
-
  >Pre-training KATA based on Wikipedia
	- In this section, we use Wikipedia, the largest online encyclopedia to date, to pre-train two mentioned mappings for the KATA model.
-
  > zero-shot learning
- In consideration of the zero-shot learning, we select several keys as zero-shot keys and remove their corresponding key-value pairs from the training set but retain the pairs in the test set. To make the difficulty of the selected keys average, we select some keys with small number of trigger expressions and some keys with large number of trigger expressions.
-
-
- That is to say, removing index embedding obtains improvement in accuracy for both zero-shot keys and non-zero-shot keys. Therefore, we remove index embedding of each token in the KATA model.
-
- [[个人想法]]
- index embedding还是要加的，只是不能加到总体上，不是一个tag的不要加到一起
-
- [[web information extraction]]
-