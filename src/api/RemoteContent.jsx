async function fetchRemoteContent(url) {
    const response = await fetch(url);
    return await response.text();
}

export { fetchRemoteContent };
