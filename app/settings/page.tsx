export default function SettingsPage() {
  return (
    <main className="container-pad space-y-6 py-8">
      <div>
        <p className="label">Paramètres</p>
        <h1 className="text-2xl font-semibold">Votre compte Tasteboxd</h1>
      </div>

      <section className="card p-6 space-y-4">
        <div>
          <label className="label">Pseudo</label>
          <input className="input" defaultValue="marie" />
        </div>
        <div>
          <label className="label">Photo</label>
          <input className="input" type="file" />
        </div>
        <div>
          <label className="label">Confidentialité</label>
          <select className="input">
            <option>Profil public</option>
            <option>Profil privé</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="button">Enregistrer</button>
          <button className="button-outline">Exporter mes données</button>
        </div>
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="text-lg font-semibold">RGPD</h2>
        <p className="text-sm text-slate-600">
          Vous pouvez supprimer votre compte et toutes vos données associées à tout moment.
        </p>
        <button className="button-outline">Supprimer mon compte</button>
      </section>
    </main>
  );
}
