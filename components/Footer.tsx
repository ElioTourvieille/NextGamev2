import Link from "next/link";
import { Separator } from "./ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Separator />
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto h-24 px-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} NextGame. Tous droits réservés.
        </p>
        <p className="flex text-sm text-muted-foreground gap-4 underline">
          <Link href="/" className="hover:text-primary">
            Politique de confidentialité
          </Link>
          <Link href="/" className="hover:text-primary">
            Conditions d'utilisation
          </Link>
          <Link href="/" className="hover:text-primary">
            Politique de cookies
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
