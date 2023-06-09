import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

require('datatables.net-bs')
require('datatables.net-keytable');
require('datatables.net-keytable-bs/css/keyTable.bootstrap.css')

/**
 * Wrapper component for dataTable plugin
 * Only DOM child elements, componets are not supported (e.g. <Table>)
 */
export default class Datatable extends Component {

    static propTypes = {
        /** datatables options object */
        options: PropTypes.object,
        /** only one children allowed */
        children: PropTypes.element.isRequired,
        /** callback that receives the datatable instance as param */
        dtInstance: PropTypes.func
    }

    static defaultProps = {
        options: {
            'paging': false, // Table pagination
            // 'ordering': true, // Column ordering
            'info': false, // Bottom left status text
            // responsive: true,
            "dom": '<"float-left"f><"clear">',
            oLanguage: {
                sSearch: '<em class="fa fa-search"></em>',
                
            }
            // language: { search: "" },


            // ,
            // "order": [[ 0, "asc" ]]
        }
    }

    componentDidMount() {
        const dtInstance = $(this.tableElement).dataTable(this.props.options);

        if(this.props.dtInstance)
            this.props.dtInstance(dtInstance)
    }

    componentWillUnmount() {
        $(this.tableElement).dataTable({destroy: true});
    }

    setRef = node => this.tableElement = node;

    render() {
        return (
            React.cloneElement(React.Children.only(this.props.children), {
                ref: this.setRef
            })
        )
    }
}