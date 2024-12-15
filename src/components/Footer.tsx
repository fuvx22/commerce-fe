const Footer = () => {

    return (
        <footer className="bg-white border-t-2">
            <div className="container mx-auto p-4">
                <div className="flex justify-center gap-3">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#" className="hover:underline">Shop</a>
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Contact</a>                    
                </div>
            </div>
            
            <p className="text-center">&copy; 2024 E-commerce</p>
        </footer>
    );
}

export default Footer;