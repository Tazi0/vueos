<template>
    <div class="container">
        <div class="left">
            <div class="menu">
                <div class="item">
                    <h3>Title</h3>
                    <p>Paragraph leg bom the scop de lap</p>
                </div>
                <div class="item">
                    <h3>Title</h3>
                    <p>Paragraph leg bom the scop de lap</p>
                </div>
                <div class="item">
                    <h3>Title</h3>
                    <p>Paragraph leg bom the scop de lap</p>
                </div>
                <div class="item">
                    <h3>Title</h3>
                    <p>Paragraph leg bom the scop de lap</p>
                </div>
                <div class="item">
                    <h3>Title</h3>
                    <p>Paragraph leg bom the scop de lap</p>
                </div>
                <div class="item">
                    <h3>Title</h3>
                    <p>Paragraph leg bom the scop de lap</p>
                </div>
                <div class="item">
                    <h3>Title</h3>
                    <p>Paragraph leg bom the scop de lap</p>
                </div>
                <div class="item">
                    <h3>Title</h3>
                    <p>Paragraph leg bom the scop de lap</p>
                </div>
                <div class="item">
                    <h3>Title</h3>
                    <p>Paragraph leg bom the scop de lap</p>
                </div>
                <div class="item">
                    <h3>Title</h3>
                    <p>Paragraph leg bom the scop de lap</p>
                </div>
            </div>
        </div>
        <div class="right">
            <h2>Title</h2>
            <div class="text">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tempora quos 
                    quis earum molestiae sed suscipit! Id tempora eos nihil temporibus qui eaque, 
                    obcaecati natus laudantium maxime, maiores cum doloremque!
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure blanditiis veritatis 
                    tempore officia laboriosam. Expedita voluptatibus porro optio. Quidem et debitis 
                    nobis quod labore! Repudiandae quisquam asperiores natus mollitia consectetur.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Notes",
    props: {
    },
    data() {
        console.log(this);
        return {}
    }
}
</script>

<style scoped>
.container {
    display: flex;
}
.left {
    height: 460px;
    width: 25%;
    max-width: 400px;
    min-width: 200px;
    
    background-color: rgba(71, 71, 71, 0.34);
    backdrop-filter: blur(16px) brightness(115%);

    border-bottom-left-radius: 13px;
}

.menu {
    padding: 0 10px;
    overflow-x: hidden;
    overflow-y: auto;

    max-height: 100%;
}

.menu::-webkit-scrollbar {
    display: none;
}

.item {
    margin-bottom: 10px;
    background-color: white;
    padding: 5px 10px;

    border-radius: 13px;

    cursor: pointer;
}

.item h3 {
    margin: 0;
    color: black;

    cursor: pointer;
}

.item p {
    margin: 3px 0;
    color: #787878;
    margin-left: 30px;

    font-size: 13px;

    cursor: pointer;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


.right {
    background-color: #F3ECEF;

    flex-grow: 1;
    border-bottom-right-radius: 13px;

    padding: 20px;
}

.right h2 {
    margin-top: 0;

    color: black;
    
    font-style: italic;
}
</style>