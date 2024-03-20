import { useState } from "react";
import Container from "~/components/Container/index";
import { api } from "~/utils/api";

export default function Home() {

  const res = api.post.getCategories.useQuery();

  console.log("res", res.data)


  return (
    <>
      <Container type="Signup" data={[]} />
    </>
  );
}
