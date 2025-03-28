import { useEffect } from 'react'
import logo from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../components/input'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z.string().email('Insira um email válido').nonempty('O campo email é obrigatório'),
  password: z.string().min(6, "A senha deve haver ao menos 6 caracteres").nonempty("Ocampo senha é obrigatório")

})

type FormData = z.infer<typeof schema>

export function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth)
    }
    handleLogout();
  }, [])

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name
        })
        console.log("LOGADO COM SUCESSO!")
        navigate("/dashboard", { replace: true })
      })
      .catch((error) => {
        console.log("ERRO AO CADASTRAR ESTE USUARIO")
        console.log(error);
      })
  }

  return (
    <Container>
      <div className='wfull min-h-screen flex items-center justify-center flex-col gap-4'>
        <Link to="/" className='wfull max-w-sm mb-6'>
          <img
            src={logo}
            alt="logo do site"
            className='w-full' />
        </Link>

        <form
          className='w-full max-w-xl rounded-lg bg-white'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='mb-3'>
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>

          <div className='mb-3'>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className='mb-3'>
            <Input
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button type="submit" className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium'>
            Cadastrar
          </button>

        </form>

        <Link to="/login">
          Já possui uma conta? Faça o Login!
        </Link>

      </div>
    </Container>
  );
}
