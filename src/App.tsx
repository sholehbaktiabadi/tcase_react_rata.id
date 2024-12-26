import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Input, Form } from "@nextui-org/react";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CATALOGGUE, DELETE_CATALOGUE, GET_CATALOGUE } from "./queries/catalogue";
import { useEffect, useState } from "react";
interface Catalogue {
  id: number
  name: string
  category: string
}
function App() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const { data } = useQuery<{ getAllCatalogue: Catalogue[] }>(GET_CATALOGUE);
  const [deleteCatalogue] = useMutation(DELETE_CATALOGUE);
  const [createCatalogue] = useMutation(CREATE_CATALOGGUE);

  const onPressDelete = async (id: number) => {
    await deleteCatalogue({ variables: { deleteOneCatalogueId: parseFloat(id.toString()) } })
  }

  const onSubmitCreate = async () => {
    await createCatalogue({ variables: { dto: { name, category } } })
    setName("")
    setCategory("")
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
        <Button color="primary" className="my-5" onPress={onOpen}>Create</Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"><p>Create</p></ModalHeader>
                <ModalBody>
                  <Input onChange={(e) => setName(e.target.value)} label="name" type="text" />
                  <Input onChange={(e) => setCategory(e.target.value)} label="category" type="text" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => { onSubmitCreate(), onClose() }}>
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

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
