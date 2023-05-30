import Balancer from "react-wrap-balancer";
import Image from "next/image";
import PostsList from "components/PostsList";
import Marquee from "components/Marquee";
import Follow from "components/Follow";
import Header from "components/Header";
import { getPosts } from "lib/posts";

export default async function Page() {
  const posts = (await getPosts()).slice(0, 5);
  console.log(process.env.MAILER_LITE_API_KEY);

  return (
    <>
      <Header />

      <div className="grid border-t-4 border-black md:grid-cols-2">
        <div className="flex items-center justify-center border-b-4 border-black bg-green-500 md:border-b-0 md:border-r-4">
          <div className="max-w-lg px-4 py-10 md:py-56">
            <Balancer as="h1" className="text-7xl font-bold">
              Hey, I'm Gio!
            </Balancer>
            <span className="mt-9 block text-2xl font-medium">
              I'm a tech lead and instructor. I'm sharing the lessons I learned
              building web applications that serve millions of users.
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center bg-pink-500 py-10">
          <div className="relative">
            <Image
              src="/me.png"
              width={305}
              height={305}
              alt="Gio Polvara"
              className="rounded-full border-4 border-black"
            />
            <span className="absolute bottom-0 left-0 rotate-3 rounded-full border-4 border-black bg-blue-500 px-5 py-3 text-2xl tracking-wide text-blue-50">
              Ciao!
            </span>
          </div>
        </div>
      </div>

      <PostsList posts={posts} showMore className="border-t-4 border-black" />

      <Marquee italic>
        polvara<span className="text-pink-500">.</span>me
      </Marquee>

      <Follow />
    </>
  );
}
