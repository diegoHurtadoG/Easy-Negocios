
const API = "http://10.0.2.2:3000/projects"

export const getProjects = async () => {
    const res = await fetch(API)
    return await res.json()
}

export const saveProject = async (newProject) => {
    await fetch(API,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        });
    return await res.json;
}

export const deleteProject = async (id) => {
    await fetch(`${API}/${id}`, {
        method: 'DELETE',

    })
}