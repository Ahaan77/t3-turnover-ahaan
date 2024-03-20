import Container from "~/components/Container/index"
import { api } from "~/utils/api";

const Protected = () => {

    const res = api.post.getCategories.useQuery();
    console.log("data", res?.data)


    return (
        <Container type="protected" data={res?.data} />
    )
}

export default Protected