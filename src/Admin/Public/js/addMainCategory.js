const mainCategoryForm = document.querySelector("#mainCategoryForm");
const mainCategoryInput = mainCategoryForm.querySelector("input");

mainCategoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (mainCategoryInput.value.trim()) {
        let value = mainCategoryInput.value.trim();
        let response = await fetch(`/main-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category_name: value }),
        });

        response = await response.json();

        if (!response.ok) {
            alert("Error: ", response.message);
        } else {
            window.location.reload();
        }
    }
});
