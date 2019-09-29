console.log('feedbackjs');


db.collection('feedbacks').get().then(snapshot => {

    console.log(snapshot.docs);
    setupGuides(snapshot);
});

const setupGuides = (data) => {
    let html = '';
    var cnt = 1;
    data.forEach(doc => {
        const guide = doc.data();
        console.log(guide);

        // comment start

        const productsDom = document.getElementById("tbody");
        const div = document.createElement('tr');
        // div.className = 'media comment-box mt-4';
        div.innerHTML = `
            <tr>
                <th scope="row">${cnt++}</th>
                <td>${guide.Name}</td>
                <td>${guide.Email}</td>
                <td>${guide.Subject}</td>
                <td>${guide.Message}</td>
            </tr>
            `;
        productsDom.appendChild(div);
        // comment end
    });
}