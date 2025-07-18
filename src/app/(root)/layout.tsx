import StreamVideoProvider from "@/components/ui/providers/StreamClientProvider";


function Layout({children}: {children: React.ReactNode}) {
    return <StreamVideoProvider>{children}</StreamVideoProvider>;

}

export default Layout;