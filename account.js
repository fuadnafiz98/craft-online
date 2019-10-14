console.log('accountjs');
var prev_name, prev_phone, prev_mobile, prev_address, prev_city, prev_code;


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("user_name").innerHTML = `<a href = "./account.html"  style="text-decoration: none; color:black;">${user.displayName}</a>`;
        console.log(user.displayName);
        var userRealName = user.displayName;
        document.getElementById('edit_name').value = userRealName;
        db.collection('account').get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data().Email);
                if (user.email == doc.data().Email) {
                    document.getElementById("user-name").innerHTML = doc.data().Name;
                    document.getElementById("name").innerHTML = doc.data().Name;
                    document.getElementById("email").innerHTML = doc.data().Email;
                    document.getElementById("phone").innerHTML = doc.data().Phone;
                    document.getElementById("mobile").innerHTML = doc.data().Mobile;
                    document.getElementById("address").innerHTML = doc.data().Address;
                    document.getElementById("city").innerHTML = doc.data().City;
                    document.getElementById("pcode").innerHTML = doc.data().Postal_Code;
                    prev_name = doc.data().Name;
                    prev_phone = doc.data().Phone;
                    prev_mobile = doc.data().Mobile;
                    prev_address = doc.data().Address;
                    prev_city = doc.data().City;
                    prev_code = doc.data().Postal_Code;
                }
            })
        });

        const subBtn = document.getElementById("submit");
        subBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let name = document.getElementById('edit_name').value;
            let phone = document.getElementById('edit_phone').value;
            let mobile = document.getElementById('edit_mobile').value;
            let address = document.getElementById('edit_address').value;
            let city = document.getElementById('edit_city').value;
            let code = document.getElementById('edit_code').value;

            console.log(mobile, mobile.length);

            if (name.length == 0) name = prev_name;
            if (phone.length == 0) phone = prev_phone;
            if (mobile.length == 0) mobile = prev_mobile;
            if (address.length == 0) address = prev_address;
            if (city.length == 0) city = prev_city;
            if (code.length == 0) code = prev_code;

            // Set the "capital" field of the city 'DC'
            db.collection("account").doc(user.uid).update({
                Name: name,
                Mobile: mobile,
                City: city,
                Phone: phone,
                Address: address,
                Postal_Code: code
            }).then(() => {
                console.log('Done');
                window.location.reload();

            });
        });

    } else {
        console.log('not');
        // * MUSt add today
        window.alert('Please Login to access Account Details');
        window.location = "../index.html";
    }
});