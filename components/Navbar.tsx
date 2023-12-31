import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/constant";
import { getCurrentUser } from "@/lib/session";

import AuthProviders from "./AuthProviders";
import Button from "./Button";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar ">
      <div className="flex-1 flexStart gap-6 xl:gap-96">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="logo" />
        </Link>
        <ul className="flex text-sm gap-5 xl:gap-10">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text} legacyBehavior>
              <a
                className="font-semibold text-gray-600 hover:text-green-700 transition-colors duration-300"
              >
                {link.text}
              </a>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4 ">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <Button title="Share work" />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
