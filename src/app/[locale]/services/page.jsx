import ServicesList from "@/components/ServicesList"

export default async function Services(){
    const data= await fetch('https://aj-ziad.github.io/services-api/services.json')
    const services = await data.json()
    return(
        <main className="flex flex-col items-center w-full">
      <ServicesList services={services}  />
    </main>
    )
}