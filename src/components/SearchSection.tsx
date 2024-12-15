import { Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() === "") {
      return;
    }

    navigate(`/shop/${search}`);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Search />
      </SheetTrigger>
      <SheetContent className="h-[200px] flex justify-center" side={"top"}>
        <div className="flex-1 md:basis-[1280px] md:flex-grow-0 flex items-center gap-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button variant={"outline"} onClick={handleSearch}>
            <Search size={18} />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSection;
