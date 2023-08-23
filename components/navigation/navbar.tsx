import { MobileSidebar } from "@/components/navigation/mobile-sidebar";
import ThemeButton from "@/components/theme-button";
import ThemedUserButton from "@/components/themed-user-button";
import ThemedOrganizationSwitcher from "@/components/themed-organization-switcher";

const Navbar = async () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full items-center justify-end space-x-8">
        <div className="hidden md:block">
          <ThemedOrganizationSwitcher />
        </div>
        {/* <UserButton afterSignOutUrl="/" /> */}
        <ThemedUserButton />
        <ThemeButton />
      </div>
    </div>
  );
};

export default Navbar;
