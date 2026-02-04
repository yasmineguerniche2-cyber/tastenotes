'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  restaurant: z.string().min(2),
  rating: z.coerce.number().min(0.5).max(5),
  visitedAt: z.string(),
  priceRangeAtVisit: z.enum(['€', '€€', '€€€']),
  tags: z.string().optional(),
  text: z.string().min(20)
});

type FormValues = z.infer<typeof formSchema>;

export default function NewReviewPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { rating: 4, priceRangeAtVisit: '€€' }
  });

  const onSubmit = (data: FormValues) => {
    console.log('submit review', data);
  };

  return (
    <main className="container-pad space-y-6 py-8">
      <div>
        <p className="label">Nouvel avis</p>
        <h1 className="text-2xl font-semibold">Partager votre expérience</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4 p-6">
        <div>
          <label className="label">Restaurant</label>
          <input className="input" placeholder="Nom du restaurant" {...register('restaurant')} />
          {errors.restaurant && <p className="text-xs text-red-500">{errors.restaurant.message}</p>}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Note (0.5 - 5)</label>
            <input className="input" type="number" step="0.5" {...register('rating')} />
          </div>
          <div>
            <label className="label">Date de visite</label>
            <input className="input" type="date" {...register('visitedAt')} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Budget</label>
            <select className="input" {...register('priceRangeAtVisit')}>
              <option value="€">€</option>
              <option value="€€">€€</option>
              <option value="€€€">€€€</option>
            </select>
          </div>
          <div>
            <label className="label">Tags</label>
            <input className="input" placeholder="brunch, romantique..." {...register('tags')} />
          </div>
        </div>
        <div>
          <label className="label">Votre avis</label>
          <textarea className="input min-h-[140px]" {...register('text')} />
          {errors.text && <p className="text-xs text-red-500">{errors.text.message}</p>}
        </div>
        <button className="button" type="submit">
          Publier l'avis
        </button>
      </form>
    </main>
  );
}
