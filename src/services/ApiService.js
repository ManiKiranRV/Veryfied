const baseUrl = 'https://api.verified.realware.tech/veryfied/veryfiedApp';
const baseUrl1 = 'https://api.verified.realware.tech/veryfied';

export async function createExcel(obj) {
    const response = await fetch(baseUrl + `/createExcel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
    return await response.json();
}

export async function excelDownload(fileName) {
    const response = await fetch(baseUrl1 + `/excel/` + fileName,
        {
            responseType: 'arraybuffer',
            headers: { 'Content-Type': 'blob' }
        })
    return await response.blob();
}

export async function uploadimages(images) {
    var data = new FormData();
    data.append("file", images);
    const response = await fetch(baseUrl + `/upload`, {
        method: 'POST',
        type: "formData",
        body: data
    })
    return await response.json();
}


export async function uploadExcel(excelFile) {
    var data = new FormData();
    data.append("file", excelFile);
    const response = await fetch(baseUrl + `/uploadExcel`, {
        method: 'POST',
        type: "formData",
        body: data
    })
    return await response.json();
}

export async function createCert(data) {
    const response = await fetch(baseUrl + `/createCert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function mintCertificate(data) {
    const response = await fetch(baseUrl + `/mintCertificate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}


export async function getImagesDocs(imageNewFileName) {
    const response = await fetch(baseUrl1 + `/docs/` + imageNewFileName,
        {
            responseType: 'arraybuffer',
            headers: { 'Content-Type': 'blob' }
        })
    return await response.blob();
}


export async function getCerts() {
    const response = await fetch(baseUrl + `/getCerts/`,
        {
            headers: { 'Content-Type': 'application/json' },
        })
    return await response.json();
}
export async function getCertUniversityDetails(filter) {
    const response = await fetch(baseUrl + `/getCertUniversityDetails`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({filter})
        })
        return await response.json();
}

export async function getCertCollegeDetails(filter) {
    const response = await fetch(baseUrl + `/getCertCollegeDetails`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({filter})
        })
        return await response.json();
}