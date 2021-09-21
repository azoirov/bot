let lessonCreateForm = document.querySelector("form#lessonForm");
let categoryCreateForm = document.querySelector("form#subCategoryForm");

lessonCreateForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    let lessonName = lessonCreateForm
        .querySelector("input#lessonName")
        .value.trim();
    let fileId = lessonCreateForm.querySelector("input#fileId").value.trim();
    let caption = lessonCreateForm.querySelector("textarea").value.trim();
    let categoryId =
        lessonCreateForm.querySelector("button").dataset.categoryId;

    if (lessonName && fileId && caption && categoryId) {
        // Fetch
        let response = await fetch(`/create-lesson`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category_id: categoryId,
                lesson_name: lessonName,
                caption: caption,
                file_id: fileId,
            }),
        });

        response = await response.json();

        if (response.ok) window.location.reload();
        else alert(response.message);
    }
});

categoryCreateForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    let categoryName = categoryCreateForm
        .querySelector("input#categoryName")
        .value.trim();
    let categoryId =
        categoryCreateForm.querySelector("button").dataset.categoryId;

    if (categoryName && categoryId) {
        // Fetch
        let response = await fetch(`/create-sub-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category_id: categoryId,
                category_name: categoryName,
            }),
        });

        response = await response.json();

        if (response.ok) {
            window.location.reload();
        } else {
            alert(response.message);
        }
    }
});
