import firebase from "firebase";


async function returnResponse(response) {
    if (response.status >= 300) {
        let message = "Unknown Error " + response.status
        try {
            let json = await response.json();
            if (json.errors && typeof json.errors === "string") {
                message = json.errors
            }
        } catch (e) {
            console.log(e)
        }
        throw new Error(message)
    }
    let json = await response.json();
    return json;
}

export async function get(url, params) {
    let token = await firebase.auth().currentUser.getIdToken()
    let response = await fetch(url + "?" + new URLSearchParams(params), {
            headers: {
                Authorization: "Bearer " + token
            }
        }
    );

    return returnResponse(response)
}


export async function del(url, params) {
    let token = await firebase.auth().currentUser?.getIdToken()
    let response = await fetch(url + "?" + new URLSearchParams(params), {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + token
            }
        }
    );

    return returnResponse(response)
}

export async function post(url, data) {
    let token = await firebase.auth().currentUser?.getIdToken()
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Authorization: "Bearer " + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return returnResponse(response)
}


