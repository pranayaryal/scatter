const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
};

const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const xValue = d => d.Calories
const xScale = d3.scaleLinear().range([0, width])

const xMap = d => xScale(xValue(d))
const xAxis = d3.axisBottom(xScale)

const yValue = d => d.Protein
const yScale = d3.scaleLinear().range([height, 0])

const yMap = d => yScale(yValue(d))
const yAxis = d3.axisLeft(yScale)

const cValue = d => d.Manufacturer
const color = d3.scaleOrdinal(d3.schemeCategory10);

var rawCsv = 'CerealName,Manufacturer,Type,Calories,Protein,Fat,Sodium,DietaryFiber,Carbs,Sugars,Display Shelf,Potassium,VitaminsMinerals,ServingSizeWeight,CupsPerServing\n' +
    '100%_Bran,Nabisco,C,70,4,1,130,10,5,6,3,280,25,1,0.33\n' +
    '100%_Natural_Bran,Quaker Oats,C,120,3,5,15,2,8,8,3,135,0,1,-1\n' +
    'All-Bran,Kelloggs,C,70,4,1,260,9,7,5,3,320,25,1,0.33\n' +
    'All-Bran_with_Extra_Fiber,Kelloggs,C,50,4,0,140,14,8,0,3,330,25,1,0.5\n' +
    'Almond_Delight,Ralston Purina,C,110,2,2,200,1,14,8,3,-1,25,1,0.75\n' +
    'Apple_Cinnamon_Cheerios,General Mills,C,110,2,2,180,1.5,10.5,10,1,70,25,1,0.75\n' +
    'Apple_Jacks,Kelloggs,C,110,2,0,125,1,11,14,2,30,25,1,1\n' +
    'Basic_4,General Mills,C,130,3,2,210,2,18,8,3,100,25,1.33,0.75\n' +
    'Bran_Chex,Ralston Purina,C,90,2,1,200,4,15,6,1,125,25,1,0.67\n' +
    'Bran_Flakes,Post,C,90,3,0,210,5,13,5,3,190,25,1,0.67\n' +
    'Cap\'n\'Crunch,Quaker Oats,C,120,1,2,220,0,12,12,2,35,25,1,0.75\n' +
    'Cheerios,General Mills,C,110,6,2,290,2,17,1,1,105,25,1,1.25\n' +
    'Cinnamon_Toast_Crunch,General Mills,C,120,1,3,210,0,13,9,2,45,25,1,0.75\n' +
    'Clusters,General Mills,C,110,3,2,140,2,13,7,3,105,25,1,0.5\n' +
    'Cocoa_Puffs,General Mills,C,110,1,1,180,0,12,13,2,55,25,1,1\n' +
    'Corn_Chex,Ralston Purina,C,110,2,0,280,0,22,3,1,25,25,1,1\n' +
    'Corn_Flakes,Kelloggs,C,100,2,0,290,1,21,2,1,35,25,1,1\n' +
    'Corn_Pops,Kelloggs,C,110,1,0,90,1,13,12,2,20,25,1,1\n' +
    'Count_Chocula,General Mills,C,110,1,1,180,0,12,13,2,65,25,1,1\n' +
    'Cracklin\'_Oat_Bran,Kelloggs,C,110,3,3,140,4,10,7,3,160,25,1,0.5\n' +
    'Cream_of_Wheat_(Quick),Nabisco,H,100,3,0,80,1,21,0,2,-1,0,1,1\n' +
    'Crispix,Kelloggs,C,110,2,0,220,1,21,3,3,30,25,1,1\n' +
    'Crispy_Wheat_&_Raisins,General Mills,C,100,2,1,140,2,11,10,3,120,25,1,0.75\n' +
    'Double_Chex,Ralston Purina,C,100,2,0,190,1,18,5,3,80,25,1,0.75\n' +
    'Froot_Loops,Kelloggs,C,110,2,1,125,1,11,13,2,30,25,1,1\n' +
    'Frosted_Flakes,Kelloggs,C,110,1,0,200,1,14,11,1,25,25,1,0.75\n' +
    'Frosted_Mini-Wheats,Kelloggs,C,100,3,0,0,3,14,7,2,100,25,1,0.8\n' +
    'Fruitful_Bran,Kelloggs,C,120,3,0,240,5,14,12,3,190,25,1.33,0.67\n' +
    'Fruity_Pebbles,Post,C,110,1,1,135,0,13,12,2,25,25,1,0.75\n' +
    'Golden_Crisp,Post,C,100,2,0,45,0,11,15,1,40,25,1,0.88\n' +
    'Golden_Grahams,General Mills,C,110,1,1,280,0,15,9,2,45,25,1,0.75\n' +
    'Grape_Nuts_Flakes,Post,C,100,3,1,140,3,15,5,3,85,25,1,0.88\n' +
    'Grape-Nuts,Post,C,110,3,0,170,3,17,3,3,90,25,1,0.25\n' +
    'Great_Grains_Pecan,Post,C,120,3,3,75,3,13,4,3,100,25,1,0.33\n' +
    'Honey_Graham_Ohs,Quaker Oats,C,120,1,2,220,1,12,11,2,45,25,1,1\n' +
    'Honey_Nut_Cheerios,General Mills,C,111,3,1,250,1.5,11.5,10,1,90,25,1,0.75\n' +
    'Honey-comb,Post,C,110,1,0,180,0,14,11,1,35,25,1,1.33\n' +
    'Just_Right_Crunchy__Nuggets,Kelloggs,C,110,2,1,170,1,17,6,3,60,100,1,-1\n' +
    'Just_Right_Fruit_&_Nut,Kelloggs,C,140,3,1,170,2,20,9,3,95,100,1.3,0.75\n' +
    'Kix,General Mills,C,110,2,1,260,0,21,3,2,40,25,1,1.5\n' +
    'Life,Quaker Oats,C,100,4,2,150,2,12,6,2,95,25,1,0.67\n' +
    'Lucky_Charms,General Mills,C,110,2,1,180,0,12,12,2,55,25,1,1\n' +
    'Maypo,American Home Food Products,H,100,4,1,0,0,16,3,2,95,25,1,-1\n' +
    'Mueslix_Crispy_Blend,Kelloggs,C,160,3,2,150,3,17,13,3,160,25,1.5,0.67\n' +
    'Multi-Grain_Cheerios,General Mills,C,100,2,1,220,2,15,6,1,90,25,1,1\n' +
    'Nut&Honey_Crunch,Kelloggs,C,120,2,1,190,0,15,9,2,40,25,1,0.67\n' +
    'Nutri-Grain_Almond-Raisin,Kelloggs,C,140,3,2,220,3,21,7,3,130,25,1.33,0.67\n' +
    'Nutri-grain_Wheat,Kelloggs,C,90,3,0,170,3,18,2,3,90,25,1,-1\n' +
    'Oatmeal_Raisin_Crisp,General Mills,C,130,3,2,170,1.5,13.5,10,3,120,25,1.25,0.5\n' +
    'Post_Nat._Raisin_Bran,Post,C,120,3,1,200,6,11,14,3,260,25,1.33,0.67\n' +
    'Product_19,Kelloggs,C,100,3,0,320,1,20,3,3,45,100,1,1\n' +
    'Puffed_Rice,Quaker Oats,C,50,1,0,0,0,13,0,3,15,0,0.5,1\n' +
    'Puffed_Wheat,Quaker Oats,C,50,2,0,0,1,10,0,3,50,0,0.5,-1\n' +
    'Quaker_Oat_Squares,Quaker Oats,C,100,4,1,135,2,14,6,3,110,25,1,0.5\n' +
    'Quaker_Oatmeal,Quaker Oats,H,100,5,2,0,2.7,-1,-1,1,110,0,1,0.67\n' +
    'Raisin_Bran,Kelloggs,C,120,3,1,210,5,14,12,2,240,25,1.33,0.75\n' +
    'Raisin_Nut_Bran,General Mills,C,100,3,2,140,2.5,10.5,8,3,140,25,1,0.5\n' +
    'Raisin_Squares,Kelloggs,C,90,2,0,0,2,15,6,3,110,25,1,0.5\n' +
    'Rice_Chex,Ralston Purina,C,110,1,0,240,0,23,2,1,30,25,1,1.13\n' +
    'Rice_Krispies,Kelloggs,C,110,2,0,290,0,22,3,1,35,25,1,1\n' +
    'Shredded_Wheat,Nabisco,C,80,2,0,0,3,16,0,1,95,0,0.83,-1\n' +
    'Shredded_Wheat_\'n\'Bran,Nabisco,C,90,3,0,0,4,19,0,1,140,0,1,0.67\n' +
    'Shredded_Wheat_spoon_size,Nabisco,C,90,3,0,0,3,20,0,1,120,0,1,0.67\n' +
    'Smacks,Kelloggs,C,110,2,1,70,1,9,15,2,40,25,1,0.75\n' +
    'Special_K,Kelloggs,C,110,6,0,230,1,16,3,1,55,25,1,1\n' +
    'Strawberry_Fruit_Wheats,Nabisco,C,90,2,0,15,3,15,5,2,90,25,1,-1\n' +
    'Total_Corn_Flakes,General Mills,C,110,2,1,200,0,21,3,3,35,100,1,1\n' +
    'Total_Raisin_Bran,General Mills,C,140,3,1,190,4,15,14,3,230,100,1.5,1\n' +
    'Total_Whole_Grain,General Mills,C,100,3,1,200,3,16,3,3,110,100,1,1\n' +
    'Triples,General Mills,C,110,2,1,250,0,21,3,3,60,25,1,0.75\n' +
    'Trix,General Mills,C,110,1,1,140,0,13,12,2,25,25,1,1\n' +
    'Wheat_Chex,Ralston Purina,C,100,3,1,230,3,17,3,1,115,25,1,0.67\n' +
    'Wheaties,General Mills,C,100,3,1,200,3,17,3,1,110,25,1,1';

var parsed = d3.csvParse(rawCsv)

parsed.forEach(d => {
    d.Calories = +d.Calories;
    d.Protein = +d.Protein
});


xScale.domain([d3.min(parsed, xValue) - 1, d3.max(parsed, xValue) + 1])
yScale.domain([d3.min(parsed, yValue) - 1, d3.max(parsed, yValue) + 1])

const svg = d3.select('#plotSection').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', width + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

const tooltip = d3.select('#plotSection').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis)
    .append('text')
    .attr('class', 'label')
    .attr('x', width)
    .attr('y', -6)
    .attr('fill', '#000')
    .style('text-anchor', 'end')
    .text('Calories')

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('class', 'label')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .attr('fill', '#000')
    .style('text-anchor', 'end')
    .text('Protein (g)')

svg.selectAll('.dot')
    .data(parsed)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('r', 8.5)
    .attr('cx', xMap)
    .attr('cy', yMap)
    // .style('fill', function(d) { return color(cValue(d))})
    .style('fill', d =>  color(cValue(d)) )
.on('mouseover', d =>{
    tooltip.transition()
    .duration(200)
    .style('opacity', 0.9);
tooltip.html(`${d.CerealName}<br/>Calories: ${xValue(d)}, Protein: ${yValue(d)}`)
    .style('left', `${d3.event.pageX - 210}px`)
    .style('top', `${d3.event.pageY }px`)
    .style('border', '1px solid grey')
    .style('padding-left', '15px')
    .style('padding-top', '5px')
    .style('padding-bottom', '5px')
    .style('background-color', 'lightblue')
    .style('width', `${d.CerealName.length + 200}px`)
})
.on('mouseout', d => {
    tooltip.transition()
    .duration(500)
    .style('opacity', 0)
})

var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => {
    return `translate(0,${i * 20})`
})

legend.append('rect')
    .attr('x', width - 18)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', color)


legend.append('text')
    .attr('x', width - 24)
    .attr('y', 9)
    .attr('dy', '0.35em')
    .attr('text-anchor', 'end')
    .text(d => d)





