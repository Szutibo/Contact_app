import './Skeleton.css';

export function SkeletonItem() {
    return (
        <div className='skeleton-one-contact'>
            <div className='skeleton-img'></div>
            <div>
                <div className='skeleton-item'></div>
                <div className='skeleton-item'></div>
            </div>
        </div>
    )
}