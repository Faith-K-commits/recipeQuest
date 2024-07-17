const apiKey = '0a994f055a9e491ab6fc160fac836c64';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-button').addEventListener('click', searchRecipes);

    document.getElementById('ingredient-input').addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission behavior
            searchRecipes();
            document.getElementById('ingredient-input').value = '';
        }
    });

    function searchRecipes() {
        const inputElement = document.getElementById('ingredient-input');
        const input = inputElement.value;
        const ingredients = input.split(',').map(ingredient => ingredient.trim());
        const queryString = ingredients.join(',');

        fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryString}&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(recipes => {
                const resultsSection = document.getElementById('results-section');
                resultsSection.innerHTML = ''; 

                const heading = document.createElement('h2');
                heading.textContent = 'Your search results:';
                heading.classList.add('results-heading'); // FIXME: Fix results section heading display
                resultsSection.appendChild(heading); 

                recipes.forEach(recipe => {
                const card = document.createElement('div');
                card.classList.add('recipe-card');

                const img = document.createElement('img');
                img.src = recipe.image;
                card.appendChild(img);

                const title = document.createElement('h3');
                title.textContent = recipe.title;
                card.appendChild(title);

                const instructionsButton = document.createElement('button');
                instructionsButton.textContent = 'View Instructions';
                instructionsButton.addEventListener('click', () => {
                    displayInstructions(recipe.id);
                });
                card.appendChild(instructionsButton);

                resultsSection.appendChild(card);
            });
            inputElement.value = '';
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
    }

    document.getElementById('back-button').addEventListener('click', () => {
        document.getElementById('instructions-section').style.display = 'none';
        document.getElementById('results-section').style.display = 'flex';
        document.getElementById('back-button').style.display = 'none'; 
    });

    function displayInstructions(recipeId) {
        fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(recipe => {
            const instructionsSection = document.getElementById('instructions-section');
            instructionsSection.innerHTML = `<p>${recipe.instructions}</p>`;
            instructionsSection.style.display = 'flex';

            document.getElementById('results-section').style.display = 'none';
            document.getElementById('back-button').style.display = 'block'; // BUG: Debug back button display
        })
        .catch(error => {
            console.error('Error fetching recipe instructions:', error);
        });
}
});