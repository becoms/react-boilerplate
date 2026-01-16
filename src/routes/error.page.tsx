import { Button } from "@/components/button";
import { Link } from "react-router-dom";


export const ErrorComponent = () => {
  return (
    <div className="flex-1 flex items-center justify-center flex-wrap h-full w-full">
      <div className="flex flex-col items-center">
        <h3 className="font-bold text-on-background/80 text-center mt-8">404</h3>
        <p className="text-xs text-on-background/60 text-center">
          Une erreur est survenue.
        </p>
      </div>
    </div>
  );
};
const ErrorPage = () => {
  return (
    <div className="flex-1 flex items-center justify-center flex-wrap h-full w-full">
      <div className="flex flex-col items-center">
        <h2 className="text-6xl md:text-8xl font-bold text-on-background/80 text-center mt-8">
          404
        </h2>
        <p className="max-w-lg text-sm text-on-background/60 text-center mt-2">
          La page à laquelle vous souhaitez accéder est introuvable ou vous
          n'avez pas les autorisations nécessaires pour la consulter.
        </p>
        <p className="max-w-lg text-sm text-on-background/60 text-center mt-2">
          Veuillez contacter l'administrateur de l'application.
        </p>
        <Link to="/" className="mt-10">
          <Button variant="secondary">Retour à la page d'accueil</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
