import axiosWithAuth from "../utils/axiosWithAuth";

const articleService = () => {
    return axiosWithAuth()
        .get("/articles")
        .then(res => {
            return res.data;
        })
        .catch(err => console.error(err));
};

export default articleService;
