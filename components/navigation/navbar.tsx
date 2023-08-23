import { MobileSidebar } from "@/components/navigation/mobile-sidebar";
import ThemeButton from "@/components/theme-button";
import ThemedUserButton from "@/components/themed-user-button";

const Navbar = async () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full items-center justify-end space-x-8">
        {/* <UserButton afterSignOutUrl="/" /> */}
        <ThemedUserButton />
        <ThemeButton />
      </div>
    </div>
  );
};

export default Navbar;
