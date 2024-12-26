import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CATALOGUE, GET_CATALOGUE } from "./queries/catalogue";
import { useEffect, useState } from "react";
interface Catalogue {
  id: number
  name: string
  category: string
}
function App() {

  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const { data } = useQuery<{ getAllCatalogue: Catalogue[] }>(GET_CATALOGUE);
  const [ deleteCatalogue ] = useMutation(DELETE_CATALOGUE);

  const onPressDelete = async (id: number) => {
    await deleteCatalogue({ variables: { deleteOneCatalogueId: parseFloat(id.toString()) } })
  }

  useEffect(() => {
    if (data?.getAllCatalogue) {
      console.log(data)
      setCatalogues(data.getAllCatalogue);
    }
  }, [data]);

  return (
    <>
      <div className="h-screen w-full bg-slate-200 p-20">
        <Button className="my-5" color="primary">Create</Button>;
        <div>
          <Table aria-label="Example static collection table">
            <TableHeader>
            <TableColumn>ID</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {catalogues.map(({ id, name, category }) =>
                <TableRow key={id}>
                  <TableCell className="text-slate-500">{id}</TableCell>
                  <TableCell className="text-slate-500">{name}</TableCell>
                  <TableCell className="text-slate-500">{category}</TableCell>
                  <TableCell className="text-slate-500">
                    <Button onPress={() => onPressDelete(id)} color="warning">Delete</Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default App
