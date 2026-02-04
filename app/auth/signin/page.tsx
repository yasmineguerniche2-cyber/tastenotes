export default function SignInPage() {
  return (
    <main className="container-pad space-y-6 py-10">
      <div>
        <p className="label">Connexion</p>
        <h1 className="text-2xl font-semibold">Accédez à vos restaurants</h1>
      </div>
      <form className="card space-y-4 p-6">
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" placeholder="vous@mail.com" />
        </div>
        <div>
          <label className="label">Mot de passe</label>
          <input className="input" type="password" placeholder="••••••••" />
        </div>
        <button className="button" type="submit">
          Se connecter
        </button>
        <button className="button-outline" type="button">
          Continuer avec Google
        </button>
      </form>
    </main>
  );
}
