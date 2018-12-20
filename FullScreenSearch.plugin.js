//META{"name":"FullScreenSearch"}*//
var FullScreenSearch = function() {
    "use strict";

    return class FullScreenSearch {
        getName() { return "FullScreenSearch"; }
        getDescription() { return "Makes Discord's search results full screen. Also allows you to select and copy the matched result."; }
        getVersion() { return "1.0.3"; }
        getAuthor() { return "Green"; }
        getUpdateLink() { return "https://raw.githubusercontent.com/Curtis-D/FullScreenSearch/master/FullScreenSearch.plugin.js"; }
        load() {}
        stop() {}

        start() {
            var libraryScript = document.getElementById('zeresLibraryScript');
            if (libraryScript) libraryScript.parentElement.removeChild(libraryScript);
            libraryScript = document.createElement("script");
            libraryScript.setAttribute("type", "text/javascript");
            libraryScript.setAttribute("src", "https://rauenzi.github.io/BetterDiscordAddons/Plugins/PluginLibrary.js");
            libraryScript.setAttribute("id", "zeresLibraryScript");
            document.head.appendChild(libraryScript);
            if (typeof window.ZeresLibrary !== "undefined") this.initialize();
            else libraryScript.addEventListener("load", () => { this.initialize(); });
        }



        initialize() {
            this.initialized = true;           
            PluginUtilities.checkForUpdate(this.getName(), this.getVersion(), this.getUpdateLink());
            PluginUtilities.showToast(this.getName() + " " + this.getVersion() + " has started.");
        }

        onSwitch() {
            if(document.querySelector(".search-results-wrap")){ document.querySelector(".search-results-wrap").style.display = "none"; }
            if(document.querySelector(".messagesWrapper-3lZDfY")){ document.querySelector(".messagesWrapper-3lZDfY").parentNode.style.display = "inherit"; }
        }

        observer(e){
            
            if(e.addedNodes[0] && e.addedNodes[0].classList && e.addedNodes[0].classList.contains("search-results-wrap")){
                document.querySelector(".channelName-3stJzi").lastChild.textContent += " - Search Messages"
                e.addedNodes[0].previousSibling.style.display = "none";
                e.addedNodes[0].style.width = "100%";
                e.addedNodes[0].addEventListener("click", (e) => {
                    if(e.target.classList.contains("jump-button")){
                        document.querySelector(".messagesWrapper-3lZDfY").parentNode.style.display = "inherit";
                        document.querySelector(".search-results-wrap").style.display = "none";
                    }
                });
            }

            if(e.addedNodes[0] && e.addedNodes[0].classList && (e.addedNodes[0].classList.contains("results-wrapper") || e.addedNodes[0].classList.contains("empty-results-wrap"))){
                e.addedNodes[0].parentNode.parentNode.parentNode.style.display = "inherit";
                e.addedNodes[0].parentNode.parentNode.parentNode.previousSibling.style.display = "none";
                for(var interactionsCounter = 0; interactionsCounter < e.addedNodes[0].querySelectorAll(".sink-interactions.clickable").length; interactionsCounter++){
                    let element = e.addedNodes[0].querySelectorAll(".sink-interactions.clickable")[interactionsCounter];
                    if(element.parentNode.parentNode.classList.contains("hit")){ element.style.display = "none"; }
                }
                for(var bodyCounter = 0; bodyCounter < e.addedNodes[0].querySelectorAll(".body").length; bodyCounter++){
                    let element = e.addedNodes[0].querySelectorAll(".body")[bodyCounter];
                    element.style.webkitUserSelect = "text";
                };
            }
            

            if(e.removedNodes[0] && e.removedNodes[0].classList && e.removedNodes[0].classList.contains("search-results-wrap")){
                let channelNameTextContent = document.querySelector(".channelName-3stJzi").lastChild.textContent;
                if(channelNameTextContent.slice(-18) === " - Search Messages"){
                    document.querySelector(".channelName-3stJzi").lastChild.textContent = channelNameTextContent.slice(0, channelNameTextContent.length - 18);
                }
                document.querySelector(".da-messagesWrapper").parentNode.style.display = "inherit";
            }
        }


    }
}();
