import Container from "~/components/Container/index"
import { api } from "~/utils/api";

const Protected = () => {
    const res = api.post.getCategories.useQuery();
    const data = res?.data ?? []; // Default to an empty array if res?.data is undefined

    return (
        <Container type="protected" data={data} />
    )
}

export default Protected;