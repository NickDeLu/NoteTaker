window.addEventListener("DOMContentLoaded",()=>{
			
			const addItem = document.getElementById("addItem");
			const clearSave = document.getElementById("clear");
			const form = document.getElementById("form");
			const inputs = [];
			
			/*This function creates a notecard, its textarea, its close button, and delete button
			 *It accepts one parameter 'text' that is the content of the note. 
			 *If note is blank a '' is recieved
			 */
			function createNote(text){
				
				<!--Create the noteCard div-->
				var noteCard = document.createElement("div");
				noteCard.placeholder = "enter your note";
				noteCard.innerHTML=text;
				noteCard.addEventListener("click",popup);
				form.appendChild(noteCard);
				
				<!--Create the noteContainer that holds the textarea and close button-->
				var noteContainer = document.createElement("P");
				noteContainer.classList.add("popup");
				form.appendChild(noteContainer);
				
				<!--Create the note textarea-->
				var newNote = document.createElement("TEXTAREA");
				newNote.placeholder = "enter your note";
				newNote.value = text;
				inputs.push(newNote);
				newNote.id = inputs.indexOf(newNote);
				noteContainer.appendChild(newNote);
				
				<!--Create the close button for the popup-->
				var closeBtn = document.createElement("BUTTON");
				closeBtn.innerHTML = "X";
				closeBtn.addEventListener("click",()=>{
					save();
				});
				noteContainer.appendChild(closeBtn);
				
				<!--Create the delete button for the noteCard-->
				var deleteBtn = document.createElement("BUTTON");
				deleteBtn.innerHTML = '&#128465';
				deleteBtn.id = inputs.indexOf(newNote);
				deleteBtn.addEventListener("click",deleteNote,false);
				noteCard.appendChild(deleteBtn);	
			}
			<!--This function controls the textarea that pops up when you edit a note with css-->
			function popup(e){
				if(e.target.nodeName == "DIV"){
					form.style.position = 'fixed';
					divs = document.getElementsByTagName("div");
					popups = document.getElementsByClassName("popup");
					for(var i =0; i < divs.length; i++){
						divs[i].style.display = 'none';
					}
					for(var i =0; i < popups.length; i++){
						popups[i].style.display = 'inline';
					}
					paragraphs = document.getElementsByTagName("p");
					for(var i =0; i < paragraphs.length; i++){
						if(!(paragraphs[i].isSameNode
						(form.children[Array.prototype.indexOf.call(form.children,e.target)+1]))){
							paragraphs[i].style.display = 'none';
						}
					}
				}
			}
			<!--This function deletes a note from the app -->
			function deleteNote (element){
				parent = element.target.parentNode;
				for(var i =0; i<inputs.length;i++){
						if(element.target.id == inputs[i].id){
							form.removeChild(parent);
							notes.splice(notes.indexOf(inputs[i]),1)
							inputs.splice(inputs.indexOf(inputs[i]),1);
							save();
						}
				}	
			}
			<!--This condition updates the current notes with the saved notes-->
			if(localStorage){<!--test to see if localstorage is supported-->
				if(localStorage.notes){
					var notes = JSON.parse(localStorage.notes);<!--use localstorage array for notes-->
					for(var i =0; i<notes.length;i++){
						createNote(notes[i]);
					}		
				}else{
					var notes = []; <!--otherwise, make our own notes array-->
				}
			}
			
			<!--this EventListener calls the createNote function and saves the new note-->
			addItem.addEventListener("click",(e)=>{
				createNote("");
				save();
			});
			<!--This function saves all the current notes to the localstorage with a JSON file-->
			function save(){
				notes = [];
				for(var i = 0; i < inputs.length;i++){
					notes.push(inputs[i].value);
				}
				<!--save notes array to localstorage-->
				localStorage.notes = JSON.stringify(notes);
			}
			
			<!--This.EventListener removes all notes from the app-->
			clearSave.addEventListener("click",(e)=>{
				localStorage.clear();
				inputs.length = 0;
				while (form.firstChild) {
					form.removeChild(form.firstChild);
				}
				save();
			});
		});
	