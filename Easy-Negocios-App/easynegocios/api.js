const API = "http://10.0.2.2:3000/projects"

//#region PROJECTS

export const getProjects = async () => {
    const res = await fetch(API)
    return await res.json()
}

export const saveProject = async (newProject) => {
    const res = await fetch(API,
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

//#endregion

//#region PRODUCTS

export const getProducts = async (id) => {
    const res = await fetch(`${API}/${id}/products`)
    return await res.json()
}

export const deleteProduct = async (project_id, product_id) => {
    await fetch(`${API}/${project_id}/products/${product_id}`, {
        method: 'DELETE',

    })
}

//#endregion

//#region CLIENTS



//#endregion

//#region SALES



//#endregion

//#region INVESTMENTS



//#endregion

//#region ORDERS



//#endregion

//#region CATEGORIES



//#endregion

//#region ORDER_PRODUCT_RELATION



//#endregion

//#region SALES_PRODUCT_RELATION



//#endregion