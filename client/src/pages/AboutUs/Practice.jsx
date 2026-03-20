import brain from '../../assets/brainpng.png'
import asan from '../../assets/asan.png'
import hand from '../../assets/hand.png'


const Practice = () => {

    return (
    <div className="relative px-4 pt-20">
        <div class="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0"></div>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl text-primary font-season-medium leading-[60px]">A meditation practice you can understand,<br />
                not just follow.</h1>
            <p className="mt-2 text-primary font-dm text-[20px] ">Avyakt combines two things most meditation programs keep separate: practice and understanding.
                <br /> We explain how attention works, how emotions show up in the body, and why consistency matters more than long
                <br /> sessions. With that understanding,
                meditation becomes a simple daily practice you can improve over time.</p>
        </div>
            
            <div className="grid grid-cols-3 mx-auto max-w-6xl">

                <div className="w-[400px] aspect-square mx-auto flex items-center justify-center
                     rounded-2xl z-1">
                    <img src={asan} className="w-full h-full object-contain" />
                </div>

                <div className="w-[400px] aspect-square mx-auto flex items-center justify-center
                     rounded-2xl z-1">
                    <img src={brain} className="w-full h-full object-contain" />
                </div>

                <div className="w-[400px] aspect-square mx-auto flex items-center justify-center
                     rounded-2xl z-1">
                    <img src={hand} className="w-full h-full object-contain" />
                </div>

            </div>
    </div>
    )
}

export default Practice