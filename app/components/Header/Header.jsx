import Link from "next/link";

export function Header() {
  return (
    <div className="flex w-full h-[150px] flex-col">
      <div className="w-full h-[50px] bg-green-500"></div>

      <div className="w-full h-[100px] bg-red-500 flex items-center justify-center">
        <div className="flex w-[50px] h-[50px] border rounded-full bg-white"></div>
        <div className="flex w-[200px] h-[50px]">
          <Link href="#">Експресс-центры</Link>
          <Link href="#">Правила перевозки</Link>
        </div>
      </div>
    </div>
  );
}
