import { useCreateRoom } from '@/http/types/use-create-room'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader } from './card'
import { Form, FormControl, FormField, FormItem, FormLabel } from './form'
import { Input } from './input'
import { Textarea } from './textarea'

const createRoomSchema = z.object({
  name: z.string().min(3, 'O nome da sala é obrigatório'),
  description: z.string(),
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom()

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  async function handleCreateRoom(data: CreateRoomFormData) {
    await createRoom({ name: data.name, description: data.description })
    await createRoomForm.reset()
  }

  return (
    <Card>
      <CardHeader>Criar sala</CardHeader>
      <CardDescription>
        Crie uma nova sala para começar a fazer perguntas e receber respostas da
        IA.
      </CardDescription>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da sala..."
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <Button className="w-full" type="submit">
              Criar sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
