import { Component, OnInit, ElementRef, Input } from '@angular/core';
declare var vis: any;

interface nodeElements {
  id: string;
  label: string;
  title : string;
  group: string;
  value: number
}

interface edgeElement {
  from: string;
  to : string;
  label : string;
  length: number;
  width : number
}




@Component({
  selector: 'app-network-vis',
  templateUrl: './network-vis.component.html',
  styleUrls: ['./network-vis.component.css']
})
export class NetworkVisComponent implements OnInit {

  @Input() edgeElements: edgeElement[];
  @Input() nodeElements: nodeElements[];
  

  name:string;
  constructor(private element: ElementRef) { 
      this.name = 'Network'
            console.log('node_in')

  }

  ngOnInit() {
  	var popupMenu = undefined
    var LENGTH_MAIN = 350
    var LENGTH_SERVER = 150
    var LENGTH_SUB = 50
    var WIDTH_SCALE = 2

    var CompanyGroup = "Company"
    var ShareholderGroup = "Shareholder"
    var NaturalPersonGroup = "Person"
    var RelatedEntitiesGroup = "RelatedEntity"
	var	ScreeningFlag = "screening"
	var	CheckFlag = "check"
	var	DownloadFlag = "download"
	var	ScreeningLabel = "Structured Screening"
	var	CheckLabel = "Media Check"
	var	DownloadLabel = "Download Details"
	var	NodeSerializationField = "Network_SerializedNodes"
    var CompanyLegendId = 1001
    var ShareholderLegendId = 1002
    var NaturalPersonLegendId = 1003
    var RelatedEntitiesLegendId = 1004
    var nodesArray = []
    var edgesArray = []
    var clusteredNodes = []

	var resourcesMap = {
			Company: "../../../assets/imagesVis/Company.png",  
			Company_screening_check_download: "../../../assets/imagesVis/Company_screening_check_download.png",
			Person: "../../../assets/imagesVis/Person.png",
			Person_check: "../../../assets/imagesVis/Person_check.png",
			Person_screening: "../../../assets/imagesVis/Person_screening.png",
			Person_screening_check: "../../../assets/imagesVis/Person_screening_check.png",
			RelatedEntity: "../../../assets/imagesVis/RelatedEntity.png",
			RelatedEntity_check: "../../../assets/imagesVis/RelatedEntity_check.png",
			RelatedEntity_download: "../../../assets/imagesVis/RelatedEntity_download.png",
			RelatedEntity_check_download: "../../../assets/imagesVis/RelatedEntity_check_download.png",
			RelatedEntity_screening: "../../../assets/imagesVis/RelatedEntity_screening.png",
			RelatedEntity_screening_check: "../../../assets/imagesVis/RelatedEntity_screening_check.png",
			RelatedEntity_screening_check_download: "../../../assets/imagesVis/RelatedEntity_screening_check_download.png",
			RelatedEntity_screening_download: "../../../assets/imagesVis/RelatedEntity_screening_download.png",
			Shareholder: "../../../assets/imagesVis/Shareholder.png",
			Shareholder_check: "../../../assets/imagesVis/Shareholder_check.png",
			Shareholder_check_download: "../../../assets/imagesVis/Shareholder_check_download.png",
			Shareholder_download: "../../../assets/imagesVis/Shareholder_download.png",
			Shareholder_screening: "../../../assets/imagesVis/Shareholder_screening.png",
			Shareholder_screening_check: "../../../assets/imagesVis/Shareholder_screening_check.png",
			Shareholder_screening_check_download: "../../../assets/imagesVis/Shareholder_screening_check_download.png",
			Shareholder_screening_download: "../../../assets/imagesVis/Shareholder_screening_download.png"
	} 


  	 var container = document.getElementById('mynetwork');


     nodesArray = this.nodeElements

     edgesArray = this.edgeElements




    var mynetwork = document.getElementById("mynetwork");
    var x = -mynetwork.clientWidth;
    var y = -mynetwork.clientHeight * 0.7;
    var step = 70;



    nodesArray.push({
        id: 1001,
        x: x,
        y: y + step,
        label: "Main Company",
        group: CompanyGroup,
        value: 1,
        fixed: true,
        physics: false
    });
    nodesArray.push({
        id: 1002,
        x: x,
        y: y + 2 * step,
        label: "Company Shareholder",
        group: ShareholderGroup,
        value: 1,
        fixed: true,
        physics: false
    });
    nodesArray.push({
        id: 1003,
        x: x,
        y: y + 3 * step,
        label: "Natural Person",
        group: NaturalPersonGroup,
        value: 1,
        fixed: true,
        physics: false
    });
    nodesArray.push({
        id: 1004,
        x: x,
        y: y + 4 * step,
        label: "Related Entities",
        group: RelatedEntitiesGroup,
        value: 1,
        fixed: true,
        physics: false
    });

    // Configuration for the Timeline
      var nodes = new vis.DataSet(nodesArray);
      var edges = new vis.DataSet(edgesArray);
	  var data = {
	    nodes: nodes,
	    edges: edges
	  };

	    var options = {
	        layout: {
	            randomSeed: 8
	        },
	        nodes: {
	            scaling: {
	                min: 16,
	                max: 32
	            },
	            color: {
	                highlight:"#2B1B17"
	            }
	        },
	        edges: {
	            color: {
	                color: "gray",
	                highlight: "#2B1B17"
	            },
	            smooth: false
	        },
	        physics: {
	            barnesHut: {
	                gravitationalConstant: -30000,
					damping: 0.7
	            },
	            stabilization: {
	                iterations: 300
	            }
	        },
	        groups: {
	            Company: {
	                shape: "image",
					image: resourcesMap["Company"],
	                color: "rgb(0, 176, 80)"
	            },
	            Shareholder: {
	                shape: "image",
					image:resourcesMap["Shareholder"],
	                color: "#5A1E5C"
	            },
	            Person: {
	                shape: "image",
					image: resourcesMap["Person"],
	                color: "#2B7CE9"
	            },
	            RelatedEntity: {
	                shape: "image",
					image: resourcesMap["RelatedEntity"],
	                color: "#C5000B"
	            }
	        },
	        interaction: {
	            hover: true
	        }
	    };

	  var network = new vis.Network(container, data, options);
	

  }

}
